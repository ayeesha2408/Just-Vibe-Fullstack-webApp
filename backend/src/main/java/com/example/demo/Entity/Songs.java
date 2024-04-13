package com.example.demo.Entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "Songs_DB")
@NoArgsConstructor
@AllArgsConstructor
public class Songs {

    @Id
    @Column(name="ID")
    private Integer id;
    @Column(name="SONG_NAME")
    private String name;
    @Column(name="SONG_ARTIST")
    private String artist;
    @Column(name="SONG_LANG")
    private String lang;
    @Column(name="SONG_YEAR")
    private Integer year;
    @Column(name="SONG_SOURCE")
    private String source;
    @Column(name="SONG_MOVIE")
    private String movie;

}



