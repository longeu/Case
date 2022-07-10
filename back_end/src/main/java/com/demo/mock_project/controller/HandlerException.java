package com.demo.mock_project.controller;

import com.demo.mock_project.model.respone.ErrorMessage;
import com.demo.mock_project.model.respone.ResultModel;
import java.nio.file.AccessDeniedException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;

@RestControllerAdvice
public class HandlerException {

  @ExceptionHandler(value = {EntityNotFoundException.class})
  public ResponseEntity<ResultModel> entityNotFoundException(EntityNotFoundException ex) {

    ErrorMessage errorMessage = ErrorMessage.builder()
        .message(ex.getMessage())
        .errors(ex.getLocalizedMessage())
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.NOT_FOUND)
        .build();
    ResultModel result = ResultModel.builder()
        .metadata(errorMessage)
        .build();
    return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public ResponseEntity<ResultModel>  methodArgumentNotValidException(
      MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage()));
    ErrorMessage errorMessage = ErrorMessage.builder()
        .message("Please double check the data !")
        .errors(ex.getLocalizedMessage())
        .timestamp(LocalDateTime.now())
        .errors(errors)
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .build();
    ResultModel result = ResultModel.builder()
        .metadata(errorMessage)
        .build();
    return new ResponseEntity<>(result, HttpStatus.UNPROCESSABLE_ENTITY);
  }


  @ExceptionHandler(value = {EntityExistsException.class})
  public ResponseEntity<ResultModel> entityAlreadyExistsException(EntityExistsException ex) {

    ErrorMessage errorMessage = ErrorMessage.builder()
        .message(ex.getMessage())
        .errors(ex.getLocalizedMessage())
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.CONFLICT)
        .build();
    ResultModel result = ResultModel.builder()
        .metadata(errorMessage)
        .build();
    return new ResponseEntity<>(result, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(value = {HttpRequestMethodNotSupportedException.class})
  public ResponseEntity<ResultModel> methodNotAllowedException(
      HttpRequestMethodNotSupportedException ex, ServletWebRequest request) {
    Map<String, String> errors = new HashMap<>();
    errors.put("METHOD_NOT_ALLOWED", ex.getMessage());
    errors.put("path", request.getRequest().getRequestURI());
    ErrorMessage errorMessage = ErrorMessage.builder()
        .message(ex.getMessage())
        .errors(errors)
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .build();
    ResultModel result = ResultModel.builder()
        .metadata(errorMessage)
        .build();
    return new ResponseEntity<>(result, HttpStatus.METHOD_NOT_ALLOWED);
  }

  @ExceptionHandler(value = {SQLException.class})
  public ResponseEntity<ResultModel> sqlException(SQLException ex) {

    ErrorMessage errorMessage = ErrorMessage.builder()
        .message(ex.getMessage())
        .errors(ex.getLocalizedMessage())
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.BAD_REQUEST)
        .build();
    ResultModel result = ResultModel.builder()
        .metadata(errorMessage)
        .build();
    return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
  }
  @ExceptionHandler(value = {AccessDeniedException.class})
  public ResponseEntity<ResultModel> accessDeniedException(AccessDeniedException ex){
    ErrorMessage errorMessage = ErrorMessage.builder()
        .message(ex.getMessage())
        .errors(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.FORBIDDEN)
        .build();
    ResultModel result = ResultModel.builder()
        .metadata(errorMessage)
        .build();
    return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
  }
}
