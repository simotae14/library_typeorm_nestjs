import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.bookService.create(body);
  }
}
