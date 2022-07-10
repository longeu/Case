package com.demo.mock_project.repository;

import com.demo.mock_project.model.TopProductModel;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TopProductRepository extends BaseRepository<TopProductModel,Long> {
    @Query(value = "SELECT pd.*,sum(od.quantity) as total_quantity_sell,sum(od.price) as total_price_sell   , p.name as product_name  from product_detail pd left join order_detail od on od.product_detail_id=pd.id join product p on p.id =pd.product_id where date(od.created_at) between ?1 and ?2 group by pd.id ORDER BY sum(od.price) desc limit 0,5 ",nativeQuery = true)
    List<TopProductModel> findAll(String fromDate,String toDate);
}
