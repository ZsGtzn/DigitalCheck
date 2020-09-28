package com.gtzn.restful.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CompanyList {
    int code;
    String msg;
    List<Company> data;
}
