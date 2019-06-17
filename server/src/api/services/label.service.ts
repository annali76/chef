import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Label from '../../postgres/entities/label.entity';

/**
 * Label CRUD service.
 */
@Injectable()
class LabelService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async findAll(): Promise<Label[]> {
    return await this.labelRepository.find();
  }
}

export default LabelService;
