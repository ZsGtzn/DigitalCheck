package com.gtzn.restful;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Utils {
    public static String replaceBlank(String str) {
        String dest = "";

        //
        if (str != null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }

        //
        return dest;
    }

    /**
     * 一行一行读取文件，解决读取中文字符时出现乱码
     *
     * 流的关闭顺序：先打开的后关，后打开的先关，
     *       否则有可能出现java.io.IOException: Stream closed异常
     *
     * @throws IOException
     */
    public static String readFile(String filename) throws IOException {
        FileInputStream fis = new FileInputStream(filename);
        InputStreamReader isr = new InputStreamReader(fis, "UTF-8");

        //
        StringBuffer sb = new StringBuffer();

        //
        while (isr.ready()) {
            // 转成char加到StringBuffer对象中
            sb.append((char) isr.read());
        }

        //
        isr.close();
        fis.close();

        //
        return sb.toString();
    }

    /**
     * 一行一行写入文件，解决写入中文字符时出现乱码
     *
     * 流的关闭顺序：先打开的后关，后打开的先关，
     *       否则有可能出现java.io.IOException: Stream closed异常
     *
     * @throws IOException
     */
    public static void writeFile(String filename, String content) throws IOException {

        // 写入中文字符时解决中文乱码问题
        FileOutputStream fos = new FileOutputStream(new File(filename));
        OutputStreamWriter osw = new OutputStreamWriter(fos, StandardCharsets.UTF_8);

        //
        BufferedWriter bw = new BufferedWriter(osw);

        //
        bw.write(content);

        // 注意关闭的先后顺序，先打开的后关闭，后打开的先关闭
        bw.close();
        osw.close();
        fos.close();
    }
}
