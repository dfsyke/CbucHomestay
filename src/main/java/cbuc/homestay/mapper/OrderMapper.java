package cbuc.homestay.mapper;

import cbuc.homestay.bean.Order;
import cbuc.homestay.bean.OrderExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface OrderMapper {
    long countByExample(OrderExample example);

    int deleteByExample(OrderExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Order record);

    int insertSelective(Order record);

    List<Order> selectByExample(OrderExample example);

    Order selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") Order record, @Param("example") OrderExample example);

    int updateByExample(@Param("record") Order record, @Param("example") OrderExample example);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    List<Map<String, Object>> querySalesData(@Param("mid") Long mid, @Param("beginTime") String beginTime, @Param("endTime") String endTime);

    Order queryLast(@Param("mid") Long mid);

    List<Order> queryMerOrderList(@Param("status") String status,@Param("id") Long id);

    List<Map<String,Object>> getCustomerList(@Param("id") Long mid);

    Map<String, Object> getSalesData(@Param("mid")Long id,@Param("offset") int i);

    Map<String, Object> getTotalCountAndPrice(@Param("mid") Long mid);

    Integer getUserCount(@Param("currentMonth")Boolean currentMonth,@Param("mid") Long mid);

    Integer getUnreadOrderCount(@Param("mid") Long mid);

    int doUpdateReadStatus(@Param("mid") Long mid);
}