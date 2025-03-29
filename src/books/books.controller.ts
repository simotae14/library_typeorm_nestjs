import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.bookService.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }
}
