package cbuc.homestay.controller.foreCenter;

import cbuc.homestay.base.Result;
import cbuc.homestay.bean.Merchant;
import cbuc.homestay.bean.News;
import cbuc.homestay.service.MerchantService;
import cbuc.homestay.service.NewsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Explain: 小程序端资讯控制器
 * @Author: Cbuc
 * @Version: 1.0
 * @Date: 2020/2/12
 */
@Controller
@Api(value = "小程序端资讯控制器", description = "资讯相关业务")
public class ForeNewsController {

    @Autowired
    private NewsService newsService;

    @Autowired
    private MerchantService merchantService;

    @ApiOperation("获取资讯列表")
    @ResponseBody
    @RequestMapping("/getNewsList")
    public Object getNewsList(@RequestParam(value = "merchantId", required = false) Long merchantId) {
        News news = News.builder().auditStatus("SA").status("E").build();
        if (merchantId != null) {
            news.setPublishId(merchantId);
        } else {
            news.setValid(true);
        }
        List<News> newsList = newsService.queryList(news);
        return Result.success(newsList);
    }

    @ApiOperation("获取资讯详情")
    @ResponseBody
    @RequestMapping("/getNewsDetail")
    public Object getNewsDetail(Long id) {
        News news = newsService.queryDetail(id);
        Merchant merchant = merchantService.queryDetail(news.getPublishId());
        news.setPublishName(merchant.getMname());
        return Result.success(news);
    }

}
