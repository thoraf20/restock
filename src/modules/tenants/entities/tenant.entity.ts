import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/entities/base.entity';
import { TenantStatus } from '../../../common/types';

@Entity('tenants')
export class Tenant extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  subdomain: string;

  @Column({ default: TenantStatus.ACTIVE })
  status: TenantStatus;

  @Column({ nullable: true, type: 'uuid' })
  ownerId: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.slug || this.name.toLowerCase().replace(/\s+/g, '-');
  }
}
