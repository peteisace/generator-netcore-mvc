using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace <%= namespace %>.<%= appName%>
{
    public class Startup
    {
        // Initialize the services
        public void ConfigureServices(IServiceCollection services)
        {
            
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // setup the error page
            // TODO: factor in the environments; this is useful just for dev.
            app.UseDeveloperErrorPage();
            
            // setup mvc to use default root.
            app.UseMvc(routes =>
            {
               routes.MapRoute(
                   name: "default",
                   template: "{controller=Home/action=Index}"
               );
            }); 
        }
    }
}