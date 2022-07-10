package com.demo.mock_project.repository;

import com.demo.mock_project.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends BaseRepository<CategoryEntity, Long> {
}
