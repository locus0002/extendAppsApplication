/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package resources;

import java.io.IOException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author Vladimir Aca
 */
@Provider
public class FilterResource implements ContainerResponseFilter{

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        MultivaluedMap<String, Object> headers = responseContext.getHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Headers", "Content-Type, origin, accept, authorization");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        headers.add("X-powered-By", "Vladimir Aca");
    }
    
}
