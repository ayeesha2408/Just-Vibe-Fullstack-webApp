package com.example.demo.Repository;

import com.example.demo.Entity.Songs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SongsRepo extends JpaRepository<Songs,Integer> {

    @Query(value = "SELECT s FROM Songs s where artist=:val")
    List<Songs> findByArtist(@Param("val") String artist);

    @Query(value = "SELECT s FROM Songs s where lang=:val")
    List<Songs> findByLang(@Param("val") String lang);

    @Query(value = "SELECT s FROM Songs s where year>=:val and year<:val1")
    List<Songs> findByYear(@Param("val") int year,@Param("val1") int max_year);

    @Query(value = "SELECT s FROM Songs s where id=:val")
    Songs findByID(@Param("val") int i);
//    @Query(value = "SELECT u FROM User u")
//    List<Songs> all();
}
