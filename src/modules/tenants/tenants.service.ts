import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const existing = await this.tenantRepository.findOne({
      where: { slug: createTenantDto.slug || createTenantDto.name.toLowerCase().replace(/\s+/g, '-') },
    });
    if (existing) {
      throw new ConflictException('Tenant with this slug already exists');
    }

    const tenant = this.tenantRepository.create(createTenantDto);
    return await this.tenantRepository.save(tenant);
  }

  async findAll() {
    return await this.tenantRepository.find();
  }

  async findOne(id: string) {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async findBySlug(slug: string) {
    const tenant = await this.tenantRepository.findOne({ where: { slug } });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.findOne(id);
    
    if (updateTenantDto.slug && updateTenantDto.slug !== tenant.slug) {
      const existing = await this.tenantRepository.findOne({
        where: { slug: updateTenantDto.slug || updateTenantDto.name?.toLowerCase().replace(/\s+/g, '-')},
      });
      if (existing) {
        throw new ConflictException('Tenant with this slug already exists');
      }
    }

    Object.assign(tenant, updateTenantDto);
    return await this.tenantRepository.save(tenant);
  }

  async remove(id: string) {
    const tenant = await this.findOne(id);
    return await this.tenantRepository.softRemove(tenant);
  }
}
