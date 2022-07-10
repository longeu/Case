package com.demo.mock_project.utils.jwt;

import com.demo.mock_project.model.UserPrinciple;
import java.io.Serializable;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Component
public class JwtProvider implements Serializable {

  private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);
  private static final long serialVersionUID = -2550185165626007488L;
  public static final long JWT_TOKEN_VALIDITY =  7 * 24 * 60 * 60 * 1000;
  private static final String SECRET_KEY = "secret";

  public String generateJwtToken(UserPrinciple userPrinciple) {
    return Jwts.builder()
        .setSubject((userPrinciple.getUsername()))
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + JWT_TOKEN_VALIDITY))
        .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
        .compact();
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser()
        .setSigningKey(SECRET_KEY)
        .parseClaimsJws(token)
        .getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(authToken);
      return true;
    } catch (Exception e) {
      logger.error("Invalid JWT token -> Message: {0}", e.getMessage());
      return false;
    }
  }
}
