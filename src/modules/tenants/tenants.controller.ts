import { Controller, Post, Body, Get, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tenant' })
  async create(@Body() createTenantDto: CreateTenantDto) {
    const tenant = await this.tenantsService.create(createTenantDto);
    return { message: 'Tenant created successfully', data: tenant };
  }

  @Get()
  @ApiOperation({ summary: 'List all tenants' })
  async findAll() {
    const tenants = await this.tenantsService.findAll();
    return { message: 'Tenants retrieved successfully', data: tenants };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tenant by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const tenant = await this.tenantsService.findOne(id);
    return { message: 'Tenant retrieved successfully', data: tenant };
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a tenant by slug' })
  async findBySlug(@Param('slug') slug: string) {
    const tenant = await this.tenantsService.findBySlug(slug);
    return { message: 'Tenant retrieved successfully', data: tenant };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tenant' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    const tenant = await this.tenantsService.update(id, updateTenantDto);
    return { message: 'Tenant updated successfully', data: tenant };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tenant' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.tenantsService.remove(id);
    return { message: 'Tenant deleted successfully' };
  }
}
