package com.example.kino;

import com.example.kino.Billett;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

    @Repository
    public interface BillettRepo extends JpaRepository<Billett, Long> {
        List<Billett> findAllByOrderByEtternavnAsc();
    }

