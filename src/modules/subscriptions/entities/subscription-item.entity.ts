import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/database/entities/tenant-base.entity';
import { Subscription } from './subscription.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('subscription_items')
export class SubscriptionItem extends TenantBaseEntity {
  @Column()
  subscriptionId: string;

  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'subscriptionId' })
  subscription: Subscription;

  @Column()
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}
