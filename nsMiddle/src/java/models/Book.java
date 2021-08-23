/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package models;

/**
 *
 * @author Vladimir Aca
 */
public class Book {
    private Integer id;
    private String author;
    private String title;
    private int year;
    private String editorial;
    private Integer numberPages;

    public Book() {
    }

    public Book(Integer id, String author, String title, int year, String editorial, Integer numberPages) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.year = year;
        this.editorial = editorial;
        this.numberPages = numberPages;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public Integer getNumberPages() {
        return numberPages;
    }

    public void setNumberPages(Integer numberPages) {
        this.numberPages = numberPages;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "{" +
            "\"id\":" + id + "," +
            "\"title\": \"" + title + "\"," +
            "\"author\": \"" + author + "\"," +
            "\"year\": " + year + "," +
            "\"editorial\": \"" + editorial + "\"," +
            "\"number_pages\": " + numberPages +
        "}";
    }
        
    
}
