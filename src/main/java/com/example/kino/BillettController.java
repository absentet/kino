package com.example.kino;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billetter")

public class BillettController {
    @Autowired
    private com.example.kino.BillettRepo billettRepo;
    @PostMapping
    public ResponseEntity<Billett> createBillett(@RequestBody Billett billett) {
        Billett savedBillett = billettRepo.save(billett);
        System.out.println("hello:");
        return new ResponseEntity<>(savedBillett, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Billett>> getAllBilletter() {
        List<Billett> sortedBilletter = billettRepo.findAllByOrderByEtternavnAsc();
        System.out.println("hello:");
        return new ResponseEntity<>(sortedBilletter, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllBilletter() {
        billettRepo.deleteAll();
        System.out.println("hello:");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}




