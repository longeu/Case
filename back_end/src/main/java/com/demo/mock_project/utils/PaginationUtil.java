package com.demo.mock_project.utils;

import static org.springframework.data.domain.PageRequest.of;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

public class PaginationUtil {
    private static final int PAGE_SIZE = 10;
    private static final int PAGE_NUMBER = 0;
    private static final String DEFAULT_SORT_FIELD = "id";

    public static Pageable pageable(int pageNumber, int pageSize, String sortBy, String sortOrder) {
        Direction direction = null;
        pageSize = pageSize > 0 ? pageSize : PAGE_SIZE;
        pageSize = pageSize > 10 ? PAGE_SIZE : pageSize;
        pageSize = pageSize < 1 ? PAGE_SIZE : pageSize;
        pageNumber = pageNumber < 1 ? PAGE_NUMBER : pageNumber;
        sortBy = sortBy.trim().length() == 0 ? DEFAULT_SORT_FIELD : sortBy;
        direction = sortOrder.equalsIgnoreCase("DESC") ? Sort.Direction.DESC : Sort.Direction.ASC;
        direction = direction == null ? Sort.Direction.ASC : direction;
        Sort sort = Sort.by(direction, sortBy);
        return of(pageNumber - 1, pageSize, sort);
    }
}
