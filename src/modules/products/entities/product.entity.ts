import { Column, Entity } from 'typeorm';
import { TenantBaseEntity } from '../../../common/database/entities/tenant-base.entity';

@Entity('products')
export class Product extends TenantBaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stockQuantity: number;

  @Column({ nullable: true })
  imageUrl: string;
}
