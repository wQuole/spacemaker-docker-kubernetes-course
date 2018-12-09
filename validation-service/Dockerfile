FROM golang:1.11.2 AS build
RUN mkdir /validation-service
WORKDIR /validation-service
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix \
    cgo -o /bin/validation-service cmd/server/main.go
FROM scratch
COPY --from=build /bin/validation-service /bin/validation-service
EXPOSE 8080
ENTRYPOINT ["validation-service"]