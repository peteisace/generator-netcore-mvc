using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace <%= namespace %>.<%= appName%>
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            // instantiate web host.
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseStartup<Startup>()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .Build();
            
            // run it :)
            host.Run();                                   
        }
    }
}