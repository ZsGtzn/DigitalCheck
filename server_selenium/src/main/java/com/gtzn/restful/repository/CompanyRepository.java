package com.gtzn.restful.repository;

import com.gtzn.restful.entity.CompanyEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends CrudRepository<CompanyEntity, String> {
    @Query("SELECT name, taxNo WHERE name like :name")
    public List<CompanyEntity> findByName(@Param("name") String name);
}
