/**
 * @NApiVersion 2.1
 * @author: Jonathan Vladimir Aca Cruz
 * @description: This custom module is responsible to execute the operations related to the book record
 */
define(['N/search', 'N/record'],
    
    (search, record) => {

        const bookFields = () => {
                return [
                        {
                                attribute: 'title',
                                mandatory: true,
                                fieldId: 'custrecord_vac_book_title'
                        },
                        {
                                attribute: 'author',
                                mandatory: true,
                                fieldId: 'custrecord_vac_book_author'
                        },
                        {
                                attribute: 'year',
                                mandatory: true,
                                fieldId: 'custrecord_vac_book_year'
                        },
                        {
                                attribute: 'editorial',
                                mandatory: true,
                                fieldId: 'custrecord_vac_book_editorial'
                        },
                        {
                                attribute: 'number_pages',
                                mandatory: false,
                                fieldId: 'custrecord_vac_book_numberpages'
                        }
                ];
            }

        const createSearch = (bookId) => {
                const bookSearch = {
                        type: 'customrecord_vac_book',
                        columns: [
                                'custrecord_vac_book_title',
                                'custrecord_vac_book_author',
                                'custrecord_vac_book_year',
                                'custrecord_vac_book_editorial',
                                'custrecord_vac_book_numberpages'
                        ]
                };
                if (bookId) {
                        bookSearch['filters'] = ['internalid', 'is', bookId];
                }
                return bookSearch;
        }

        const buildBookObject = (currentRow) => {
                return {
                        id: currentRow.id,
                        title: currentRow.getValue('custrecord_vac_book_title'),
                        author: currentRow.getValue('custrecord_vac_book_author'),
                        year: currentRow.getValue('custrecord_vac_book_year'),
                        editorial: currentRow.getValue('custrecord_vac_book_editorial'),
                        number_pages: currentRow.getValue('custrecord_vac_book_numberpages')
                };
        }

        const getById = (bookId) => {
                let currentBook = null;
                search.create(createSearch(bookId)).run().each(currentRow => {
                        currentBook = buildBookObject(currentRow);
                        return false;
                });
                return currentBook;
        }

        const getAll = () => {
                let books = [];
                search.create(createSearch(null)).run().each(currentRow => {
                        books.push(buildBookObject(currentRow));
                        return true;
                });
                return books;
        }

        const createBook = (request) => {
                let errorMsg = validateMandatoryFields(request);
                if (!errorMsg) {
                        const newBook = record.create({
                                type: 'customrecord_vac_book'
                        });
                        setValues(request, newBook);
                        return {
                                id: newBook.save(),
                                msg: ''
                        }
                } else {
                        return {
                                id: null,
                                msg: errorMsg
                        }
                }
        }

        const setValues = (request, currentRecord) => {
                bookFields().forEach(bookField => {
                        currentRecord.setValue({
                                fieldId: bookField.fieldId,
                                value: request[bookField.attribute]
                        });
                });
        }

        const updateBook = (request) => {
            let errorMsg = validateMandatoryFields(request);
            if (!errorMsg) {
                    let currentBook = null;
                    try {
                            currentBook = record.load({
                                    type: 'customrecord_vac_book',
                                    id: request.id
                            });
                    } catch (error) {
                            return {
                                    msg: 'Error trying to load the record (' + error + ')'
                            }
                    }
                    setValues(request, currentBook);
                    return {
                            id: currentBook.save(),
                            msg: ''
                    }
            } else {
                    return {
                            id: null,
                            msg: errorMsg
                    }
            }
        }

        const validateMandatoryFields = (request) => {
                let errorMsg = '';
                bookFields().forEach(bookField => {
                        if (bookField.mandatory && !request[bookField.attribute]) {
                                errorMsg += 'The attribute ' + bookField.attribute + ' is mandatory\n';
                        }
                });
                return errorMsg;
        }

        return {
                getById,
                getAll,
                createBook,
                updateBook
        }

    });
