import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/database/entities/tenant-base.entity';
import { Delivery } from './delivery.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('delivery_items')
export class DeliveryItem extends TenantBaseEntity {
  @Column()
  deliveryId: string;

  @ManyToOne(() => Delivery)
  @JoinColumn({ name: 'deliveryId' })
  delivery: Delivery;

  @Column()
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}
