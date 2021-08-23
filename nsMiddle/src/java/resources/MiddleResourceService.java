/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package resources;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import models.Book;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpRequest;
import org.apache.http.NameValuePair;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 *
 * @author Vladimir Aca
 * @company /vlacnavi>
 */
@Path("/v1")
public class MiddleResourceService {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/books")
    public Response getBooks() {
        return this.generateGetRequest(null);
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/book")
    public Response getBook(@QueryParam("id") Long id) {
        if (id != null) {
            return this.generateGetRequest(id);
        }
        return this.getMissingParametersResponse();
    }
    
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/createbook")
    public Response createBook(Book currentBook) {
        if (currentBook != null) {
            return this.genearePutRequest(currentBook);
        }
        return this.getMissingParametersResponse();
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/updatebook")
    public Response updateBook(Book currentBook) {
        if (currentBook != null) {
            return this.genearePostRequest(currentBook);
        }
        return this.getMissingParametersResponse();
    }
    
    private Response getMissingParametersResponse() {
        return Response.status(Response.Status.BAD_REQUEST).entity("MISSING_PARAMETERS").build();
    }
    
    private Response getMissingParametersResponse(String msg) {
        return Response.status(Response.Status.BAD_REQUEST).entity(msg).build();
    }
    
    private Response genearePostRequest(Book currentBook) {
        HttpPost httpPost = new HttpPost(utils.EndPoints.generateUrl());
        httpPost.addHeader("Content-Type", "application/json;charset=utf-8");
        httpPost.addHeader("Authorization", "Bearer " + utils.Constants.ACCESS_TOKEN);
        try {
            httpPost.setEntity(new StringEntity(currentBook.toString()));
            return this.sendRequest(httpPost);
        } catch (Exception e) {
            return this.getMissingParametersResponse(e.getMessage());
        }
    }
    
    private Response genearePutRequest(Book currentBook) {
        HttpPut httpPut = new HttpPut(utils.EndPoints.generateUrl());
        httpPut.addHeader("Content-Type", "application/json;charset=utf-8");
        httpPut.addHeader("Authorization", "Bearer " + utils.Constants.ACCESS_TOKEN);
        try {
            httpPut.setEntity(new StringEntity(currentBook.toString()));
            return this.sendRequest(httpPut);
        } catch (Exception e) {
            return this.getMissingParametersResponse(e.getMessage());
        }
    }
    
    private Response sendRequest(HttpEntityEnclosingRequestBase request) {
        try {
            CloseableHttpClient httpclient = HttpClients.createDefault();
            CloseableHttpResponse clientResponse = httpclient.execute(request);
            int code = clientResponse.getStatusLine().getStatusCode();
            String reason = clientResponse.getStatusLine().getReasonPhrase();
            if (code == 200) {
                HttpEntity entity = clientResponse.getEntity();
                if (entity != null && entity.getContentLength() > 0) {
                    return Response.status(Response.Status.OK).entity(EntityUtils.toString(entity)).build();
                } else {
                    return Response.status(Response.Status.NO_CONTENT).build();
                }
            } else if (code == 204) {
                return Response.status(Response.Status.NO_CONTENT).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity(reason).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    private Response generateGetRequest(Long id) {
        Response response = Response.status(Response.Status.BAD_REQUEST).entity("MISSING_PARAMETERS").build();
        List<NameValuePair> parameters = new ArrayList<>();
        if (id != null) {
            parameters.add(new BasicNameValuePair("book_id", String.valueOf(id)));
        }
        
        HttpGet httpGet = new HttpGet(utils.EndPoints.generateGetUrl(parameters));
        httpGet.addHeader("Content-Type", "application/json;charset=utf-8");
        httpGet.addHeader("Authorization", "Bearer " + utils.Constants.ACCESS_TOKEN);
        
        try {
            CloseableHttpClient httpclient = HttpClients.createDefault();
            CloseableHttpResponse clientResponse = httpclient.execute(httpGet);
            int code = clientResponse.getStatusLine().getStatusCode();
            String reason = clientResponse.getStatusLine().getReasonPhrase();
            if (code == 200) {
                HttpEntity entity = clientResponse.getEntity();
                response = Response.status(Response.Status.OK).entity(EntityUtils.toString(entity)).build();
            } else {
                response = Response.status(Response.Status.BAD_REQUEST).entity(reason).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return response;
    }
}
