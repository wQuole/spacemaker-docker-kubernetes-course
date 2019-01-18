FROM golang:1.12beta1
COPY hello.go hello.go
RUN echo Building Hello World Docker image
RUN go build hello.go
ENTRYPOINT ["./hello"] 