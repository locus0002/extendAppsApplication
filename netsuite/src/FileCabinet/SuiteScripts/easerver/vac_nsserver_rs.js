/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @author: Jonathan Vladimir Aca Cruz
 * @description: Web service which will receive the http request from the Ionic application
 */
define(['./vac_book_cm', 'N/error'],
    
    (book, error) => {

        const get = (requestParams) => {
                const bookId = requestParams.book_id;
                if (bookId) {
                        const foundBook = book.getById(bookId);
                        if (foundBook) {
                                return foundBook;
                        } else {
                                createError('PARAMETER_ERROR', 'The book was not found');
                        }
                } else {
                        return book.getAll();
                }
        }

        const put = (requestBody) => {
                const response = book.createBook(requestBody);
                if (!response.msg) {
                        return response.id;
                } else {
                        createError('ERROR_CREATION', response.msg);
                }
        }

        const post = (requestBody) => {
                if (requestBody.id) {
                        const response = book.updateBook(requestBody);
                        if (!response.msg) {
                                return response.id;
                        } else {
                                createError('ERROR_EDITION', response.msg);
                        }
                } else {
                        createError('MISSING_PARAMETERS', 'The id parameter is required');
                }
        }

        const createError = (name, message) => {
                const nsError = error.create({
                        name,
                        message,
                        cause: message,
                        notifyOff: true
                });
                log.error(name, message);
                throw nsError;
        }

        return {
                get,
                put,
                post
        }

    });
