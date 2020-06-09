package com.ux.common;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;

public class ImageBase64Util {
    /**
     * 将网络图片进行Base64位编码
     * @param imageUrl 图片的url路径，如http://.....xx.jpg
     * @return
     */
    public static String encodeImgageToBase64(URL imageUrl) {
        // 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        ByteArrayOutputStream outputStream = null;
        try {
            BufferedImage bufferedImage = ImageIO.read(imageUrl);
            outputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "jpg", outputStream);
        } catch (MalformedURLException e1) {
            e1.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        // 返回Base64编码过的字节数组字符串
        return encoder.encode(outputStream.toByteArray());
    }
    /**
     * 将本地图片进行Base64位编码
     * @param imageFile 文件
     * @return
     */
    public static String encodeImgageToBase64(File imageFile) {
        // 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        ByteArrayOutputStream outputStream = null;
        try {
            BufferedImage bufferedImage = ImageIO.read(imageFile);
            outputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "jpg", outputStream);
        } catch (MalformedURLException e1) {
            e1.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        // 返回Base64编码过的字节数组字符串
        return encoder.encode(outputStream.toByteArray());
    }
    /**
     * @param
     * @return
     */
    public static String decodeBase64ToImage(String base64, String path) {
        BASE64Decoder decoder = new BASE64Decoder();
        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        String fileName = uuid+".jpg";
        try {
            FileOutputStream write = new FileOutputStream(new File(path
                    + fileName));
            byte[] decoderBytes = decoder.decodeBuffer(base64);
            for (int i = 0; i < decoderBytes.length; ++i) {
                if (decoderBytes[i] < 0) {// 调整异常数据
                    decoderBytes[i] += 256;
                }
            }
            write.write(decoderBytes);
            write.close();
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}