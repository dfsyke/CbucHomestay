package cbuc.homestay.controller;

import cbuc.homestay.base.Result;
import cbuc.homestay.utils.QiniuCloudUtil;
import cbuc.homestay.utils.UploadUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

/**
 * @Explain: 上传工具控制器
 * @Author: Cbuc
 * @Version: 1.0
 * @Date: 2020/1/13
 */
@Slf4j
@RestController
public class UploadController {

    private final HttpServletRequest request;

    public UploadController(HttpServletRequest request) {
        this.request = request;
    }

    @PostMapping("/upload")
    public Object upload(@RequestParam(value = "file", required = false) MultipartFile file) {
        return Objects.requireNonNull(UploadUtil.upload(file));
    }

    @ResponseBody
    @RequestMapping( "/uploadImg")
    public Object uploadImg(@RequestParam(value = "file", required = false) MultipartFile file) {
        if (file.isEmpty()) {
            return Result.error("文件不能为空");
        }
        try {
            byte[] bytes = file.getBytes();
            String imageName = UUID.randomUUID().toString();
            try {
                //使用base64方式上传到七牛云
                String url = QiniuCloudUtil.put64image(bytes, imageName);
                log.info("上传地址为----：" + url);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            return Result.error("上传图片异常");
        }
        return Result.success();
    }

}
