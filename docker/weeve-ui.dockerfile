FROM nginx

# delete their shit
RUN rm /etc/nginx/conf.d/*.conf
RUN rm /etc/nginx/nginx.conf

# add our nginx conf
COPY nginx.conf /etc/nginx

# add our app
RUN mkdir -p /app/build
COPY build /app/build
