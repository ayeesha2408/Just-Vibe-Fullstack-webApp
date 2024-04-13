package com.example.demo.Controller;

import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@CrossOrigin

public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{ID}")
	public HashMap<String,String> usrdata_id(@PathVariable String ID){
        HashMap<String,String> data=new HashMap<>();
        User usr_d=userService.usr_data(Integer.parseInt(ID));
        if(usr_d!=null){
            data.put("name",usr_d.getName());
            data.put("email",usr_d.getEmail());
            data.put("liked_s",usr_d.getLiked());

        }
        System.out.println(data);
		return data;
	}
    @GetMapping("/song/lang/{lang}")
    public List<List<String>> SongByLang(@PathVariable String lang){
        return userService.SongByLang(lang) ;
    }

    @GetMapping("/song/artist/{artist}")
    public List<List<String>> SongByArtist(@PathVariable String artist){
        return userService.SongByArtist(artist);
    }

    @GetMapping("/song/year/{year}")
    public List<List<String>> SongByYear(@PathVariable String year){
        return userService.SongByYear(year);
    }
    @GetMapping("/song/liked/{list}")
    public List<List<String>> LikedSongs(@PathVariable List<String> list){
        return userService.LikedSongs(list);
    }
    @GetMapping("/song/all")
    public List<List<String>> AllSongs(){
        return userService.AllSongs();
    }

    @PostMapping("/add_user")
    public ResponseEntity<String> create_user(@RequestBody User user){

        if(userService.saveDetails(user)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/Authenticate")
    public ResponseEntity<String> Login(@RequestBody User user){
        String data=userService.Authenticate(user);
        if(data!=null){
            return new ResponseEntity<>(data,HttpStatus.OK);
        } else{
            return new ResponseEntity<>("",HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/song/U_SongList")
    public ResponseEntity<String>U_SongList(@RequestBody User data){
        if (!userService.U_SongList(data.getLiked(), Integer.parseInt(String.valueOf(data.getId())))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }


    }
}
