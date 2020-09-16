package com.gtzn.restful.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "company")
public class CompanyEntity {
    @Id
    @Column(name = "textNo")
    private String accessToken = "";

    @Column(name = "name")
    private String clientId = "";
}