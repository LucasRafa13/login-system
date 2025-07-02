FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["SistemaLogin.Api/SistemaLogin.Api.csproj", "SistemaLogin.Api/"]
RUN dotnet restore "SistemaLogin.Api/SistemaLogin.Api.csproj"
COPY . .
WORKDIR "/src/SistemaLogin.Api"
RUN dotnet build "SistemaLogin.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SistemaLogin.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# COPIA O appsettings.json CUSTOMIZADO
COPY SistemaLogin.Api/appsettings.json ./appsettings.json

ENTRYPOINT ["dotnet", "SistemaLogin.Api.dll"]
