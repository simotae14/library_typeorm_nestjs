/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

  create(book: Book, user: any): Promise<Book> {
    const newBook = this.repo.create({
      name: book.name,
      price: book.price,
      author: book.author,
      user: user.id,
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

  // Update a Book by ID => PUT /books/:id
  async update(id: string, body: Book): Promise<Book | null> {
    const book = await this.repo.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    // target is book and assign it to body
    Object.assign(book, body);

    return this.repo.save(book);
  }

  // Delete a Book by ID => DELETE /books/:id
  async remove(id: string): Promise<Book> {
    const book = await this.repo.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return this.repo.remove(book);
  }
}
