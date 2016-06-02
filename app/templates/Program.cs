using Microsoft.AspNetCore.Hosting;

namespace <%= namespace %>.<%= appName%>
{
    public static void Main(string[] args)
    {
        // instantiate web host.
        var host = new WebHostBuilder()
            .UseKestrel()
            .UseStartup<Startup>()
            .UseContentRoot(Directory.GetCurrentDirectory()
            .Build();
            
        // run it :)
        host.Run();            
    }
}