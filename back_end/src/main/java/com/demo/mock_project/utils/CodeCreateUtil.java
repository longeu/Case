package com.demo.mock_project.utils;

public abstract class CodeCreateUtil {

    public static String getCode(Object entity, Long count) {

        String entityName = entity.getClass().getSimpleName().toLowerCase();
        String prefix = entityName.substring(0, 3);
        String suffix = String.format("%05d", count);
        return prefix.toUpperCase() + suffix;
    }
}
