package com.gtzn.restful.service;

import com.gtzn.restful.entity.CompanyEntity;
import com.gtzn.restful.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class CompanyService {
    @Resource
    private CompanyRepository companyRepository;

    @Transactional
    public void saveCompany(final CompanyEntity companyEntity){
        companyRepository.save(companyEntity);
    }

    @Transactional
    public List<CompanyEntity> fetchCompanyList(final String name){
        List<CompanyEntity> companyList = companyRepository.findByName(name);

        return companyList;
    }
}
