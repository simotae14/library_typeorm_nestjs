import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.repo.find();
  }

  create(book: Book): Promise<Book> {
    const newBook = this.repo.create({
      name: book.name,
      price: book.price,
      author: book.author,
    });

    return this.repo.save(newBook);
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.repo.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }
}
