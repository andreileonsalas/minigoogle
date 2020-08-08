/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calculeweight;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
public class CalculeWeight {

    
    public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable>{
         
         
    private final static IntWritable zero = new IntWritable(0);
    private final static IntWritable one = new IntWritable(1);
    private final static IntWritable two = new IntWritable(2);
    private final static IntWritable three = new IntWritable(3);
    private final static IntWritable five = new IntWritable(5);
    private final static IntWritable ten = new IntWritable(10);
    public  static String URL = "";
    
    private Text word = new Text();
    public void map(Object key, Text value, Mapper.Context context) throws IOException, InterruptedException {
        String value1 = value.toString();
       
        
        StringTokenizer lineas = new StringTokenizer(value1, "\n");
        
        while (lineas.hasMoreTokens()){
            String linea = lineas.nextToken();
            if (linea.startsWith("Titulo|")){
                StringTokenizer itr = new StringTokenizer(linea);
                boolean banderita = true;
                while (itr.hasMoreTokens()) {
                  if (banderita){
                    String str = itr.nextToken();
                    word.set(URL + "|" + str.substring(7).toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim());
                    context.write(word, ten);
                    banderita = !banderita;
                  }
                  else{
                    //String str = "titulo|";
                    String str1 = itr.nextToken().toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str1);
                    context.write(word, ten);
                  }
                }
            }
            else if (linea.startsWith("h1|")){
                StringTokenizer itr = new StringTokenizer(linea);
                boolean banderita = true;
                while (itr.hasMoreTokens()) {
                  if (banderita){
                    String str = itr.nextToken().substring(3).toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" +str);
                    context.write(word, ten);
                    banderita = !banderita;
                  }
                  else{
                  //String str = "h1|";
                  String str1 = itr.nextToken().toLowerCase().replaceAll("[^\\p{Alpha}\\p{Digit}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str1);
                  context.write(word, ten);}
                }
            }
            else if (linea.startsWith("h2|")){
                StringTokenizer itr = new StringTokenizer(linea);
                boolean banderita = true;
                while (itr.hasMoreTokens()) {
                  if (banderita){
                    String str = itr.nextToken().substring(3).toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str);
                    context.write(word, five);
                    banderita = !banderita;
                  }
                  else{
                  //String str = "h2|";
                  String str1 = itr.nextToken().toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str1);
                  context.write(word, five);}
                }
            }
            else if (linea.startsWith("h3|")){
                StringTokenizer itr = new StringTokenizer(linea);
                boolean banderita = true;
                while (itr.hasMoreTokens()) {
                  if (banderita){
                    String str = itr.nextToken().substring(3).toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str);
                    context.write(word, three);
                    banderita = !banderita;
                  }
                  else{
                  //String str = "h3|";
                  String str1 = itr.nextToken().toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str1);
                  context.write(word, three);
                  }
                }
            }
            else if (linea.startsWith("h4|")){
                StringTokenizer itr = new StringTokenizer(linea);
                boolean banderita = true;
                while (itr.hasMoreTokens()) {
                  if (banderita){
                    String str = itr.nextToken().substring(3).toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str);
                    context.write(word, two);
                    banderita = !banderita;
                  }
                  else{
                  //String str = "h4|";
                  String str1 = itr.nextToken().toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                   word.set(URL + "|" + str1);
                  context.write(word, two);}
                }
            }
            else if (linea.startsWith("p|")){
                StringTokenizer itr = new StringTokenizer(linea);
                boolean banderita = true;
                while (itr.hasMoreTokens()) {
                  if (banderita){
                    String str = itr.nextToken().substring(2).toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                    word.set(URL + "|" + str);
                    context.write(word, one);
                    banderita = !banderita;
                  }else
                  {
                  //String str = "p|";
                  String str1 = itr.nextToken().toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                  word.set(URL + "|" + str1);
                  context.write(word, one);}
                }
            }
            else if (linea.startsWith("href|")){
                
                URL = linea.substring(5);
                }
            
            else{
                StringTokenizer itr = new StringTokenizer(linea);
                while (itr.hasMoreTokens()) {
                  String str = itr.nextToken().toLowerCase().replaceAll("[^\\p{Alpha}\\üéáíóúñàâãäåèêëìîïòôõöùûüÿ]+", "").trim();
                  word.set(URL + "|" + str);
                  context.write(word, one);
                }
            }
            
        }
      
    }
  }
    
    public static class IntSumReducer
       extends Reducer<Text,IntWritable,Text,IntWritable> {
    private IntWritable result = new IntWritable();

    public void reduce(Text key, Iterable<IntWritable> values,
                       Context context
                       ) throws IOException, InterruptedException {
      int sum = 0;
      for (IntWritable val : values) {
        sum += val.get();
      }
      result.set(sum);
      String str = key.toString().trim();
      if(str.charAt(str.length()-1) != '|')
        context.write(key, result);
    }
  }
    
    /**
     * @param args the command line arguments
     * @throws java.lang.Exception
     */
    public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "word count");
    job.setJarByClass(CalculeWeight.class);
    job.setMapperClass(TokenizerMapper.class);
    job.setCombinerClass(IntSumReducer.class);
    job.setReducerClass(IntSumReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
    
    }
    
    
}
