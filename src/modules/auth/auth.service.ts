import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../../common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tenantsService: TenantsService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async signup(signupDto: SignupDto) {
    return await this.dataSource.transaction(async (manager) => {
     
      const slug = signupDto.businessSlug || signupDto.businessName.toLowerCase().replace(/\s+/g, '-');
      
      const existingTenant = await manager.findOne(Tenant, { where: { slug } });
      if (existingTenant) {
        throw new ConflictException('Business with this name or slug already exists');
      }

      const tenant = manager.create(Tenant, {
        name: signupDto.businessName,
        slug,
      });
      const savedTenant = await manager.save(tenant);

      const existingUser = await manager.findOne(User, { where: { email: signupDto.email } });
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const salt = await genSalt();
      const hashedPassword = await hash(signupDto.password, salt);

      const newUser = manager.create(User, {
        email: signupDto.email,
        password: hashedPassword,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
        role: UserRole.ADMIN,
        tenantId: savedTenant.id,
      });
      
      const savedUser = await manager.save(newUser);

      savedTenant.ownerId = savedUser.id;
      await manager.save(savedTenant);

      return {
        tenant: savedTenant,
        user: {
          id: savedUser.id,
          email: savedUser.email,
          role: savedUser.role,
          tenantId: savedUser.tenantId,
        },
      };
    });
  }

  async register(registerDto: RegisterDto) {
    const tenant = await this.tenantsService.findOne(registerDto.tenantId);

    const userPayload = {
      email: registerDto.email,
      password: registerDto.password,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: registerDto.role,
      tenantId: tenant.id,
    };

    return this.usersService.create(userPayload);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role, 
      tenantId: user.tenantId 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      }
    };
  }
}
