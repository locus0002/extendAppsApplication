import { BookInterface } from "../interfaces/book.interface";

export class BookModel {
    public id: number;

    constructor(
        public title: string,
        public author: string,
        public year: number,
        public editorial: string,
        public numberPages?: number
    ) {

    }

    toBookInterface(): BookInterface {
        return {
            id: this.id,
            author: this.author,
            editorial: this.editorial,
            title: this.title,
            year: this.year,
            number_pages: this.numberPages
        }
    }
}