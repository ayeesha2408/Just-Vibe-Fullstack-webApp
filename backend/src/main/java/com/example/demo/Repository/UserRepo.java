package com.example.demo.Repository;

import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepo extends JpaRepository<User,Integer> {
    @Query(value = "SELECT u FROM User u where email=:val")
    User findByEmail(@Param("val") String email);

    @Query(value = "SELECT u FROM User u where id=:val")
    User findbyId(@Param("val") int id);

    @Modifying
    @Transactional
    @Query(value = "update User u set liked=:val where id =:val1")
    void update_songList(@Param("val") String list,@Param("val1") int id);

}
