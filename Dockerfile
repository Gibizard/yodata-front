FROM nginx:stable-alpine
COPY ./build /etc/nginx/html
COPY ./frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]