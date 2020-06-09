package com.ux.common;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Iterator;
import java.util.UUID;

public class ImageUtil {



    /**
     * 上传图片
     * @param file            图片文件
     * @param path            文件存储地址
     * @throws IOException
     */
    public static String uploadImage(MultipartFile file,String path)throws IOException{

        if(path.equals("")){
            return null;
        }else if(!new File(path).isDirectory()){
            return null;
        }else if(file == null){
            return null;
        }

        System.out.print("上传文件=============="+"\n");
        // 获取文件名
        String originalFilename = file.getOriginalFilename();
        //获取输入流
        InputStream inputStream = file.getInputStream();
        //获取后缀
        String extendName = originalFilename.substring(originalFilename.lastIndexOf("."), originalFilename.length());
        //创建文件唯一命名
        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        String fileName = uuid+extendName;
        System.out.print("保存的文件名为: "+fileName+"\n");

        path = path +fileName;
        System.out.print("保存文件绝对路径"+path+"\n");
        //创建文件路径
        File dest = new File(path);

        //判断文件父目录是否存在
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }

        try {
            //上传文件
            file.transferTo(dest); //保存文件

            System.out.print("保存文件============="+path+"\n");
        } catch (IOException e) {
            return null;
        }
        return fileName;
    }

    /**
     * 上传图片
     * @param file            图片文件
     * @param path            文件存储地址
     * @param isThumb         是否是缩略图
     * @throws IOException
     */
    public static String uploadImage(MultipartFile file,String path,boolean isThumb)throws IOException{

        if(path.equals("")){
            return null;
        }else if(!new File(path).isDirectory()){
            return null;
        }else if(file == null){
            return null;
        }

        System.out.print("上传文件=============="+"\n");
        // 获取文件名
        String originalFilename = file.getOriginalFilename();
        //获取输入流
        InputStream inputStream = file.getInputStream();
        //获取后缀
        String extendName = originalFilename.substring(originalFilename.lastIndexOf("."), originalFilename.length());
        //创建文件唯一命名
        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        String fileName = uuid+extendName;
        System.out.print("保存的文件名为: "+fileName+"\n");

        path = path +fileName;
        System.out.print("保存文件绝对路径"+path+"\n");
        //创建文件路径
        File dest = new File(path);

        //判断文件父目录是否存在
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }

        try {
            //上传文件
            if(isThumb){
                reduceImage(inputStream,path,5);
            }else {
                file.transferTo(dest); //保存文件
            }
            System.out.print("保存文件============="+path+"\n");
        } catch (IOException e) {
            return null;
        }
        return fileName;
    }

    /**
     * 按倍率缩小图片
     * @param inputStream       文件输入流
     * @param toImagePath        写入图片路径
     * @param ratio                缩小比率  宽、高一起等比率缩小
     * @throws IOException
     */
    private static void reduceImage(InputStream inputStream ,String toImagePath,int ratio) throws IOException{
        FileOutputStream out = null;
        try{
            // 构造Image对象
            BufferedImage src = ImageIO.read(inputStream);
            int width = src.getWidth();
            int height = src.getHeight();
            // 缩小边长
            BufferedImage tag = new BufferedImage(width / ratio, height / ratio, BufferedImage.TYPE_INT_RGB);
            // 绘制 缩小  后的图片
            tag.getGraphics().drawImage(src, 0, 0, width / ratio, height / ratio, null);
            out = new FileOutputStream(toImagePath);
            JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
            encoder.encode(tag);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(out != null){
                out.close();
            }
        }
    }



    /**
     * 对图片进行剪裁   返回字节数组
     * @param is            图片输入流
     * @param width            裁剪图片的宽
     * @param height        裁剪图片的高
     * @param imageFormat    输出图片的格式 "jpeg jpg等"
     * @return
     */
    private byte[] clipImage(InputStream is, int width, int height, String imageFormat){
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            // 构造Image对象
            BufferedImage src = ImageIO.read(is);
            // 缩小边长
            BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            // 绘制 缩小  后的图片
            tag.getGraphics().drawImage(src, 0, 0, width, height, null);
            ImageIO.write(tag, imageFormat, bos);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return bos.toByteArray();
    }



    /**
     * 重置图片大小
     * @param srcImagePath            读取图片路径
     * @param toImagePath            写入图片路径
     * @param width                    重新设置图片的宽
     * @param height                重新设置图片的高
     * @throws IOException
     */
    private void reduceImage(String srcImagePath,String toImagePath,int width, int height) throws IOException{
        FileOutputStream out = null;
        try{
            //读入文件
            File file = new File(srcImagePath);
            // 构造Image对象
            BufferedImage src = ImageIO.read(file);
            // 缩小边长
            BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            // 绘制 缩小  后的图片
            tag.getGraphics().drawImage(src, 0, 0, width, height, null);
            out = new FileOutputStream(toImagePath);
            JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
            encoder.encode(tag);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(out != null){
                out.close();
            }
        }
    }





    /**
     * 对图片裁剪，并把裁剪新图片保存
     * @param srcPath               读取源图片路径
     * @param toPath             写入图片路径
     * @param x                     剪切起始点x坐标
     * @param y                     剪切起始点y坐标
     * @param width                 剪切宽度
     * @param height             剪切高度
     * @param readImageFormat     读取图片格式
     * @param writeImageFormat   写入图片格式
     */
     private void cropImage(String srcPath, String toPath, int x,int y,int width,int height, String readImageFormat,String writeImageFormat){
        FileInputStream fis = null ;
        ImageInputStream iis =null ;
        try{
            //读取图片文件
            fis = new FileInputStream(srcPath);
            Iterator<ImageReader> readers = ImageIO.getImageReadersByFormatName(readImageFormat);
            ImageReader reader = readers.next();
            //获取图片流
            iis = ImageIO.createImageInputStream(fis);
            reader.setInput(iis, true);
            ImageReadParam param = reader.getDefaultReadParam();
            //定义一个矩形
            Rectangle rect = new Rectangle(x, y, width, height);
            //提供一个 BufferedImage，将其用作解码像素数据的目标。
            param.setSourceRegion(rect);
            BufferedImage bi = reader.read(0, param);
            //保存新图片
            ImageIO.write(bi, writeImageFormat, new File(toPath));
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            try{
                if(fis!=null){
                    fis.close();
                }
                if(iis!=null){
                    iis.close();
                }
            }catch(Exception e){
                e.printStackTrace();
            }
        }
    }
}
