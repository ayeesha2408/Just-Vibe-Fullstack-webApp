package com.example.demo.Service;

import com.example.demo.Entity.Songs;
import com.example.demo.Entity.User;
import com.example.demo.Repository.SongsRepo;
import com.example.demo.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private SongsRepo songRepo;

    public boolean saveDetails(User user){
        if(userRepo.findByEmail(user.getEmail())!=null){
            return false;
        }
        else{
            BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
            user.setPassword(bcrypt.encode(user.getPassword()));
            user.setLiked("");
            userRepo.save(user);
            return true;
        }



    }

    public String Authenticate(User user){
        System.out.println(userRepo.findByEmail(user.getEmail()));
        User db_user = userRepo.findByEmail(user.getEmail());
        BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
        if (db_user!=null){
            if(bcrypt.matches(user.getPassword(), db_user.getPassword())){

                return String.valueOf(db_user.getId());
            } else{
                return null;
            }
        }else {
            return null;
        }

    }

    public User usr_data(int ID){
        return userRepo.findbyId(ID);
    }
    public List<List<String>> SongByLang(String lang) {
        List<List<String>> song_list = new ArrayList<>();
        List<Songs> song = songRepo.findByLang(lang);
        for (Songs songs : song) {
            song_list.add(List.of(String.valueOf(songs.getId()), songs.getSource(), songs.getName()));
        }
        return song_list;
    }

    public List<List<String>> SongByArtist(String artist) {
        List<List<String>>song_list = new ArrayList<>();
        List<Songs> song = songRepo.findByArtist(artist);
        for (Songs songs : song) {
            song_list.add(List.of(String.valueOf(songs.getId()), songs.getSource(), songs.getName()));
        }
        return song_list;
    }

    public List<List<String>> SongByYear(String year) {
        List<List<String>> song_list = new ArrayList<>();
        List<Songs> song = songRepo.findByYear(Integer.parseInt(year),(Integer.parseInt(year)+10));
        for (Songs songs : song) {
            song_list.add(List.of(String.valueOf(songs.getId()), songs.getSource(), songs.getName()));
        }
        return song_list;
    }

    public List<List<String>> LikedSongs(List<String> list) {
        List<List<String>> song_list = new ArrayList<>();

        for(String i:list){
            System.out.println(i);
            Songs song = songRepo.findByID(Integer.parseInt(i));
            song_list.add(List.of(String.valueOf(song.getId()), song.getSource(), song.getName()));
        }
        return song_list;
    }

    public List<List<String>> AllSongs() {
        List<List<String>> song_list = new ArrayList<>();
        List<Songs> song = songRepo.findAll();
        for (Songs songs : song) {
            song_list.add(List.of(String.valueOf(songs.getId()), songs.getSource(), songs.getName()));
        }
        return song_list;
    }

    public boolean U_SongList(String data,int id) {
        userRepo.update_songList(String.valueOf(data), id);
        return true;
    }

}

