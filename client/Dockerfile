FROM nginx:stable
ADD dist/client /usr/share/nginx/html/
ADD nginx/client-nginx.template /etc/nginx/conf.d/client-nginx.template

EXPOSE 4200
CMD envsubst '\$BACKEND_HOST' < /etc/nginx/conf.d/client-nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
