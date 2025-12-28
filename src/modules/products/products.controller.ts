import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ParseUUIDPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() productData: CreateProductDto,
  ) {
    if (!tenantId) throw new BadRequestException('x-tenant-id header is required');
    const product = await this.productsService.create({ ...productData, tenantId });
    return { message: 'Product created successfully', data: product };
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for a tenant' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async findAll(@Headers('x-tenant-id') tenantId: string) {
    if (!tenantId) throw new BadRequestException('x-tenant-id header is required');
    const products = await this.productsService.findAll(tenantId);
    return { message: 'Products retrieved successfully', data: products };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    if (!tenantId) throw new BadRequestException('x-tenant-id header is required');
    const product = await this.productsService.findOne(id, tenantId);
    return { message: 'Product retrieved successfully', data: product };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('x-tenant-id') tenantId: string,
    @Body() productData: UpdateProductDto,
  ) {
    if (!tenantId) throw new BadRequestException('x-tenant-id header is required');
    const product = await this.productsService.update(id, tenantId, productData);
    return { message: 'Product updated successfully', data: product };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    if (!tenantId) throw new BadRequestException('x-tenant-id header is required');
    await this.productsService.remove(id, tenantId);
    return { message: 'Product removed successfully' };
  }
}
