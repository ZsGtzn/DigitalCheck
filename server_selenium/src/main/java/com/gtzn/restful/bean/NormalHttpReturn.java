package com.gtzn.restful.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NormalHttpReturn {
    int code;
    String msg;
}