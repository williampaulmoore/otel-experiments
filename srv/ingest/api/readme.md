# Ingest Api

REST api for the ingest service.


## Gettings started

The expected config is documented in example.env a .env should be created from this that contains appropriate setting.  The environment settings are validated in env.mjs and the application will fail to start if any of the expected environment settings have not been defined.  .env is ignored to prevent accidental commit of sensative information into source control.

The development server with hot reloading can be started using the dev script

```sh
pnpm run dev
```
